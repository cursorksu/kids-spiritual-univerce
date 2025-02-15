import { BibleTextStyled, GameScoreStyled } from './BibleTextStyled'
import { useSelector } from 'react-redux'
import { clsx } from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { DndContainer } from './DndContainer'
import { DndItem } from './DndItem'
import { ReloadIcon } from '../../assets/ReloadIcon.jsx'
import { useSplitAndRemoveWords } from '../../hooks/useSplitAndRemoveWords'
import { VeremLayout } from '../../pages/VeremLayout.jsx';

export const BibleText = () => {
	const isMenuCollapsed = useSelector((store) => store.mainMenuCollapsed)
	const { lesson } = useSelector((state) => state.lessonData)
	const [score, setScore] = useState(0)
	const [correctSound, setCorrectSound] = useState(false)
	const [errorSound, setErrorSound] = useState(false)
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!lesson) navigate(-1)
	}, [lesson, navigate])
	
	const musicRef = useRef(null)
	
	useEffect(() => {
		if (errorSound || correctSound) {
			musicRef.current = setTimeout(() => {
				setErrorSound(false)
				setCorrectSound(false)
			}, 1500)
		}
		
		return () => {
			clearTimeout(musicRef.current)
		}
	}, [errorSound, correctSound])
	
	const game = lesson?.memory?.find((el) => el.id === 'bibleText')
	const string = `${ game?.settings?.bibleText }`
	const {
		wordsArray,
		removedWordsArray
	} = useSplitAndRemoveWords(string)
	const [question, setQuestion] = useState(wordsArray)
	const [answers, setAnswers] = useState(removedWordsArray)
	
	const handleDrop = useCallback(
		(index, item) => {
			const indexes = []
			const { name } = item
			const array = string?.split(/\s+/)
			array.forEach((el, idx) => {
				if (el === name) {
					indexes.push(idx)
				}
			})
			
			let isCorrect = true
			for (let i = 0; i < indexes.length; i++) {
				if (index !== indexes[i]) {
					isCorrect = false
				} else {
					isCorrect = true
					break
				}
			}
			
			if (isCorrect) {
				setCorrectSound(true)
				setScore((prev) => prev + 10)
				setQuestion((prev) =>
					prev.map((el, idx) => ( idx === index ? name : el ))
				)
				setAnswers((prev) => prev.filter((el) => index !== el.index))
			} else {
				setErrorSound(true)
				setScore((prev) => prev - 10)
			}
		},
		[string]
	)
	
	const reloadHandler = () => {
		setQuestion(wordsArray)
		setAnswers(removedWordsArray)
		setScore(0)
	}
	
	return (
		<VeremLayout>
			<BibleTextStyled>
				<GameScoreStyled isMenuCollapsed={ isMenuCollapsed }>
					<div className="quote">{ game?.settings?.bibleQuote }</div>
					<h1 className="score">Бали: { score }</h1>
					<div className="reload-button" role="button" onClick={ reloadHandler }>
						<ReloadIcon/>
					</div>
				</GameScoreStyled>
				<DndProvider backend={ HTML5Backend } context={ window }>
					<div>
						<div className="question-group">
							{ question?.map((word, index) => {
								return word
									? (
										<span
											key={ index }
											className={ clsx({
												word: true,
												empty: !word,
											}) }>
                    <>{ word }</>
                  </span>
									)
									: (
										<DndContainer
											key={ index }
											allowedDropEffect="move"
											accept={ answers.map((el) => el.word) }
											lastDroppedItem={ null }
											onDrop={ (item) => handleDrop(index, item) }
											className={ clsx({
												word: true,
												empty: !word,
											}) }
											content={ word }
										/>
									)
							}) }
						</div>
						<div className="answer-group-bible-tex">
							{ answers?.map((word) => {
								return (
									<DndItem
										key={ word.index }
										name={ word.word }
										type={ word.word }
										isDropped={ false }
										className={ clsx({
											word: true,
										}) }>
										{ word.word }
									</DndItem>
								)
							}) }
						</div>
					</div>
				</DndProvider>
				{ correctSound && (
					<audio autoPlay={ true }>
						<source
							src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FcorrectSound.mp3?alt=media&token=dd985855-cdb5-40cd-9f1b-18543f5072e2"
							type="audio/mpeg"
						/>
						Your browser does not support the audio element.
					</audio>
				) }
				{ errorSound && (
					<audio autoPlay={ true }>
						<source
							src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FerrorSound.mp3?alt=media&token=31e41692-7cdb-4b12-a489-60ea471f0828"
							type="audio/mpeg"
						/>
						Your browser does not support the audio element.
					</audio>
				) }
			</BibleTextStyled>
		</VeremLayout>
	)
}
