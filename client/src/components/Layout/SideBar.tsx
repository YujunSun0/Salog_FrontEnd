import styled from "styled-components";
import { SvgIcon } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
	return (
		<Container>
			<NavTitle>ACCOUNT BOOK</NavTitle>
			<Lists>
				<NavStyle to="/">
					<SvgIcon
						component={GridViewIcon}
						sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
					/>
					<ListTitle>대시보드</ListTitle>
				</NavStyle>
				<NavStyle to="/history">
					<SvgIcon
						component={MenuBookIcon}
						sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
					/>
					<ListTitle>지출 · 수입</ListTitle>
				</NavStyle>
				<NavStyle to="/monthRatio">
					<SvgIcon
						component={SignalCellularAltIcon}
						sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
					/>
					<ListTitle>분석</ListTitle>
				</NavStyle>
				<NavStyle to="/budget">
					<SvgIcon
						component={PriceChangeOutlinedIcon}
						sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
					/>
					<ListTitle>예산</ListTitle>
				</NavStyle>
				<NavStyle to="/fixed_account">
					<SvgIcon
						component={AttachMoneyOutlinedIcon}
						sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
					/>
					<ListTitle>고정 지출 · 수입</ListTitle>
				</NavStyle>
			</Lists>
			<NavTitle>DIARY</NavTitle>
			<Lists>
				<NavStyle to="/diary">
					<SvgIcon
						component={StickyNote2OutlinedIcon}
						sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
					/>
					<ListTitle>일기</ListTitle>
				</NavStyle>
			</Lists>
		</Container>
	);
};

const Container = styled.div`
	/* background-color: #e9eeff; */
	border-right: 1px solid #b4b4b4;
	margin-top: 5.5rem;
	position: fixed;
	width: 20rem;
	height: 100%;
`;

const NavTitle = styled.p`
	font-size: 1rem;
	padding: 1.5rem;
	color: ${(props) => props.theme.COLORS.GRAY_500};
`;

const ListTitle = styled.p`
	font-size: 1.5rem;
	padding: 1rem 1.5rem;
	color: ${(props) => props.theme.COLORS.GRAY_700};
	font-weight: 600;
`;

const Lists = styled.div`
	border-bottom: 1px solid #b4b4b4;
`;

const NavStyle = styled(NavLink)`
	display: flex;
	align-items: center;
	padding: 0.5rem 1.3rem;
	cursor: pointer;

	> svg {
		font-size: 2.1rem;
		color: ${(props) => props.theme.COLORS.GRAY_600};
		border: 1px;
	}

	&:hover {
		background-color: #f0f3fd;
	}

	&.active {
		background-color: #e2e8ff;
		> svg,
		p {
			color: ${(props) => props.theme.COLORS.LIGHT_BLUE};
		}
	}
`;
