import React from "react";

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div>
        <div className="card m-2">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger"> {source} </span>
          </div>

          <img
            src={
              imgUrl
                ? imgUrl
                : "http://cdn.wionews.com/sites/default/files/2023/05/29/355278-fwwvzkdwiaavg0m.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} at{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-dark btn-small"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
