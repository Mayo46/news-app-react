import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'



export class News extends Component {
    static defaultProps={
        apiKey:'a434e38d7622419b90c6f568921655d0',
        pageSize:8,
        country:'in',
        category:'general'
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            article: [],
            loading: false,
            page:1,
        }
    }
    async componentDidMount(){
        this.updateNews();
    }
    async updateNews(pageNo){
        this.setState({loading:true})
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsData= await data.json()
        this.setState({
            article:parsData.articles,
            totalResults: parsData.totalResults,
            loading:false
            })
    }
    handlePreviousClick = async() => {
        this.setState({page:this.state.page - 1})
        this.updateNews();
    }
    handleNextClick= async() => {
        this.setState({page:this.state.page + 1})
        this.updateNews();
    }
    render() {
        return (
            <div className='container my-3'>
              {this.state.loading && <Spinner/>}
                <h1 className='text-center'>News Monkey-Top headline</h1>
                <div className="row">
                    {!this.state.loading && this.state.article.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem  title={element.title?.slice(0,45)} description={element.description?.slice(0,88)} date={element.publishedAt} author={element.author} source={element.source.name}
                                imageUrl={element.urlToImage ? element.urlToImage : 'https://nbcsports.brightspotcdn.com/dims4/default/1a30703/2147483647/strip/true/crop/4684x2635+0+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2F77%2F13%2F2942c53e4890817354e1cced73de%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2172654843'} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button type="button" disabled={ this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )

    }
}

export default News
