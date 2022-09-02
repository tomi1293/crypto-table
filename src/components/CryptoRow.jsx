
export const CryptoRow = ({data}) => {
  return (
    <>
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
    </>
  )
}
