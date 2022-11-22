import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'
const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeWord  = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `NewsMonkey - ${capitalizeWord(props.category)}`
        updateNews();
    }, []);

    const fetchMoreData = async () => {
        setPage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        if(parsedData.status === 'error'){
            console.log('error');
        }else{
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
        }
    }
        return (
            <>
                <h1 className="text-center" style={{margin:'80px 0 35px 0'}}>NewsMonkey - Top Headlines on {capitalizeWord(props.category)}</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {articles.map((element,index) => {
                                return <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                                    <NewsItem title={element.title !== null ? element.title.slice(0, 45).concat('...') : ''} description={element.description !== null ? element.description.slice(0, 88).concat('...') : ''} imageUrl={element.urlToImage !== null ? element.urlToImage : "https://source.unsplash.com/1200x700/?news,writing"} newsUrl={element.url} author={element.author !== null ? element.author : 'Unknown'} date={element.publishedAt !== null ? `on ${new Date(element.publishedAt).toGMTString()}` : ''} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>

        )
    }


export default News

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}