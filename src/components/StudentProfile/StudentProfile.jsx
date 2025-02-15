import {StudentProfileStyled} from "./style";

export const StudentProfile = ({student, onClose}) => {
    return (
            <StudentProfileStyled>
                <button onClick={onClose}>Close</button>
                {Object.keys(student).map(el => {
                    return(
                        <li key={el}>
                            {el === 'photo' && <img src={student[el]} alt="student"/>}
                            <b>{el}:</b>
                            {student[el]}
                        </li>
                    )})
                }
            </StudentProfileStyled>
    )
}