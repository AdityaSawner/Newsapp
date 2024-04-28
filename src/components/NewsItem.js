import React, { Component } from "react";

export class NewsItem extends Component {
 
  render() {
    let { title, description, imageUrl,newsUrl,author,date } = this.props;
    return (
      <>
        <div className="my-3">
          <div className="card" style={{ width: "18 rem" }}>
            <img src={!imageUrl?"https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart&zoom=1.5":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"> <small className="test-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
