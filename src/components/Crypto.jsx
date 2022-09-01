import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export const Crypto = () => {

    const [search, setSearch] = useState("");
    const [cryptos, setCryptos] = useState([]); 

    const endpoint = 'https://api.coingecko.com/api/v3/coins';
    
    const showData = () => {
        axios.get(endpoint).then(resp => {
            // console.log(resp.data);
            setCryptos(resp.data);
        })    
    }

    useEffect(() => {
        showData();

    }, [])
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const results = !search ? cryptos : cryptos.filter( val=> val.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <input type="text" value={search} onChange={handleSearch} placeholder="Search.." className='form-control'/>
            <table className='table table-dark table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Price 24h</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map( data => (
                            <tr key={data.id}>
                                <td>{data.market_data.market_cap_rank}</td>
                                <td><small><img src={data.image.small} alt="" />{data.name}</small></td>
                                <td>{data.symbol.toUpperCase()}</td>
                                <td>{data.market_data.current_price.bmd.toFixed(2)}</td>
                                <td>
                                    {
                                        data.market_data.price_change_percentage_24h < 0 
                                            ?(<span className='badge bg-danger'>{data.market_data.price_change_percentage_24h}</span>)
                                            :(<span className='badge bg-success'>{data.market_data.price_change_percentage_24h}</span>)
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </>

    )
}
