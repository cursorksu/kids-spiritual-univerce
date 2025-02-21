import styled from '@emotion/styled'
import { Checkbox } from 'antd';
import { VEREM_GOLD } from '../constants/colors.js'

export const CheckboxStyled = styled(Checkbox)`
	.ant-checkbox {
		.ant-checkbox-inner {
			width: 20px;
			height: 20px;
			border-radius: 6px;
		}
		
		&:hover {
			.ant-checkbox-inner {
				border-color: ${ VEREM_GOLD };
				
			}
		}
		&:focus,
		&:hover,
		&:active,
		&:focus-visible,
		&.ant-checkbox-checked {
			.ant-checkbox-inner {
				border-color: ${ VEREM_GOLD } !important;
				background: ${ VEREM_GOLD } !important;
			}
		}
	}
`;