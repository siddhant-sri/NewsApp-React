import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles ] = useState([])
  const [loading, setLoading ] = useState(false)
  const [page, setPage ] = useState(1)
  const [totalResults, setTotalResutls ] = useState(0)

  
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);

    setArticles(parsedData.articles);
    setTotalResutls(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }
  
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    //eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=91f3802d924d4035afad31d2c3e234f4&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResutls(parsedData.totalResults);
    setLoading(false);
  };

  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // };

    return (
      <>
        <h1 className="text-center" style={{ margin: "22px", marginTop : "90px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        {/* -------------------------INFINITE SCROLL ---------------------------------- */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element ? element.title : ""}
                      description={element ? element.description : ""}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* -------------------------Prev-Next Button--------------------------- */}
        {/* <div className="conatiner d-flex justify-content-between">
          <button disabled={state.page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
