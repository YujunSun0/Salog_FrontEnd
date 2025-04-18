import styled from "styled-components";
import { SvgIcon } from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
import { type wasteType, type checkedType } from ".";

interface Props {
  waste: wasteType[];
  checkedList: checkedType;
  checkHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    division: keyof checkedType
  ) => void;
}

const WasteList = ({ waste, checkedList, checkHandler }: Props) => {
  const dateAsDots = (element: string) => {
    const originalDate = element;
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    const date = new Date(originalDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeekIndex = date.getDay(); // 요일 인덱스 (0: 일요일, 1: 월요일, ...)

    const convertedDate = `${year}.${month < 10 ? "0" + month : month}.${
      day < 10 ? "0" + day : day
    } (${daysOfWeek[dayOfWeekIndex]})`;

    return convertedDate;
  };

  return (
    <Container className="ledger__lists">
      {waste.length === 0 ? (
        <NullContainer>
          <SvgIcon
            component={DoNotDisturbRoundedIcon}
            sx={{ stroke: "#ffffff", strokeWidth: 0.3 }}
          />
          <p>작성된 목록이 없습니다.</p>
        </NullContainer>
      ) : (
        waste.map((el) => {
          return (
            <li className="ledger__list" key={el.outgoId}>
              <input
                type="checkbox"
                checked={checkedList.waste.includes(el.outgoId)}
                onChange={(e) => {
                  checkHandler(e, el.outgoId, "waste");
                }}
              />
              <ColorRedDiv>지출</ColorRedDiv>
              <p>{dateAsDots(el.date)}</p>
              <p>{el.outgoTag.tagName}</p>
              <p>{el.outgoName}</p>
              <p>{el.payment}</p>
              <p className="money__red">{el.money.toLocaleString()}원</p>
              <p>{el.memo}</p>
              <SvgIcon
                component={ReceiptLongOutlinedIcon}
                sx={{ stroke: "#ffffff", strokeWidth: 0.3 }}
              />
              {el.wasteList && <div className="waste"></div>}
            </li>
          );
        })
      )}
    </Container>
  );
};

export default WasteList;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 41.3rem;
  overflow: overlay;

  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${(props) =>
      props.theme.COLORS.LIGHT_BLUE}; /* 스크롤바의 색상 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }

  .ledger__list {
    border: 1px solid #c7c7c7;
    border-top: none;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    gap: 4rem;

    input {
      cursor: pointer;
      width: 1.6rem;
      height: 1.6rem;
      margin-left: 1.5rem;
      margin-right: -0.5rem;
    }

    p {
      font-size: 1.2rem;
      white-space: wrap;

      &:nth-child(3) {
        width: 8.5rem;
        white-space: nowrap;
      }

      &:nth-child(5) {
        width: 10rem;
      }

      &:nth-child(4) {
        width: 4.2rem;
      }

      &:nth-child(6) {
        width: 4.1rem;
      }

      &:nth-child(7) {
        width: 6rem;
      }

      &:nth-child(8) {
        width: 15rem;
      }
    }

    svg {
      font-size: 1.8rem;
      margin-left: 0.5rem;
    }

    .money__red {
      color: ${(props) => props.theme.COLORS.LIGHT_RED};
    }

    .money__blue {
      color: ${(props) => props.theme.COLORS.LIGHT_BLUE};
    }
  }

  .waste {
    margin-right: 0.1rem;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    background: ${(props) => props.theme.COLORS.LIGHT_GREEN};
  }
`;

const ColorRedDiv = styled.div`
  width: 4rem;
  height: 2.2rem;
  white-space: nowrap;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.COLORS.LIGHT_RED};
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  color: white;
`;

const NullContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #c7c7c7;
  border-top: none;

  > svg {
    font-size: 6.6rem;
    color: #c7c7c7;
  }

  p {
    font-size: 1.5rem;
    color: gray;
  }
`;
