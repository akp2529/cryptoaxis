import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const skip = !coinId; // Skip query if coinId is not available
  console.log(coinId);

  const { timePeriod, setTimePeriod } = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId, { skip: !coinId });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <div>Loading...</div>;
  if (!cryptoDetails) return <div>Coin details not found.</div>;

  console.log("data: ", data);
  console.log("cryDetails: ", cryptoDetails);

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];


  console.log("API Response:", data);
  console.log("Coin ID:", coinId);

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-cointainer'>
        <Title level={2} className='coin-name'>
            {cryptoDetails.name} price {cryptoDetails.price}
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
    </Col>
    // <div>
    //   <p>Hello CryptoDetails {cryptoDetails.uuid}</p>
    //   <p>Hello CryptoDetails {cryptoDetails.name}</p>
    //   <p>Hello CryptoDetails {cryptoDetails.price}</p>
    //   <p>Hello CryptoDetails {cryptoDetails.rank}</p>
    //   <p>Hello CryptoDetails {cryptoDetails.name}</p>
    // </div>
  )
}

export default CryptoDetails
