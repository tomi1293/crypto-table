import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { CryptoRow } from './CryptoRow';

export const Crypto = () => {

    const [search, setSearch] = useState("");
    const [cryptos, setCryptos] = useState([]);
    const [orderFlag, setOrderFlag] = useState(false);

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
                                    <CryptoRow data={data}/>
                                </tr>
                            ))
                    }
                </tbody>

            </table>
        </>

    )
}
