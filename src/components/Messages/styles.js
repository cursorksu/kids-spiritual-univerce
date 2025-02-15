import styled from '@emotion/styled'
import { ERROR_MAIN } from '../../constants/colors.js'

export const TestEnvMessageStyled = styled('div')`
	.ant-modal-content {
		background: ${ERROR_MAIN};
		padding: 10px;
	}
	
	p {
		font-size: 14px;
		font-weight: 400;
		color: white;
	}
	`;