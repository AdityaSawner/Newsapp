import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';


export class News extends Component {

  static defaultProps={
    country :'in',
    pageSize : 6,
    category: 'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      
    };
  }
 
    async updateNews(){
      const url =`https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&max=9&apikey=8ccc54666b02591ac6e8a83fdf6c99f6&page=${this.state.page}&pageSize=${this.props.pageSize}`;


      // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=070cb9e85332417f801a55d877687676&page=${this.state.page}&pageSize=${this.props.pageSize}`;


    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    }

  async componentDidMount() {
 
    console.log("construcutor called");
    this.updateNews();

  }

  prevpage = async () => {
   
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
  };
  nextpage = async () => {
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();

  };

  render() {
    return (
      <div className="container my-3">
        <h1>Top {this.props.category} headlines</h1>
        <div className="row">
          {this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 30) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 45)
                        : ""
                    }
                    author={element.source.name}
                    date={element.publishedAt}
                    // imageUrl={element.urlToImage}
                    imageUrl={element.image}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.prevpage}
          >
            &laquo;prev
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.nextpage}
          >
            next&raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
