import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {fetchCoinTickers} from "../api";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const PriceWrapper = styled.div`
display: flex;
  flex-direction: column;
`;

const PriceItem = styled.div`
  background-color: ${props => props.theme.cardBgColor};
  border-radius: 15px;
  padding-left: 10px;
  padding-top: 10px;
  height: 30px;
  width: 100%;
  margin-top: 20px;
  color: ${props => props.theme.textColor};
  span {
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
 

`;

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Price() {
    const { coinId } = useParams<{coinId: string}>();
    const {isLoading, data} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));
    return (
        <Container>
            {isLoading ? "Loading..." :
                <PriceWrapper>
                    <PriceItem>
                        <span>Price : </span>
                        <span>{data?.quotes.USD.ath_price}</span>
                    </PriceItem>
                    <PriceItem>
                        <span>percent_change_7d : </span>
                        <span>{data?.quotes.USD.percent_change_7d}</span>
                    </PriceItem>
                    <PriceItem>
                        <span>percent_change_30m : </span>
                        <span>{data?.quotes.USD.percent_change_30m}</span>
                    </PriceItem>
                </PriceWrapper>


            }
        </Container>
    )
}

export default Price;