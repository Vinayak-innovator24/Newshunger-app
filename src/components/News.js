import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component{

    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1a9df7e186c481d903b090aa13c1b8e&page=1&pageSize=${this.props.pageSize}`;
            let data = await fetch(url)
            this.setState({loading: true})
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults});
        } 
        catch (error) {
            console.log(error);
        }
    }

    handlePrevClick = async ()=> {
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1a9df7e186c481d903b090aa13c1b8e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url)
            this.setState({loading: true})
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
                page: this.state.page-1,
                articles: parsedData.articles,
                loading: false
            });
        }

        catch (error) {
            console.log(error);
        }
    }

    handleNextClick = async ()=> {
        try {
            if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1a9df7e186c481d903b090aa13c1b8e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
                let data = await fetch(url)
                this.setState({loading: true})
                let parsedData = await data.json()
                console.log(parsedData);
                this.setState({
                    page: this.state.page+1,
                    articles: parsedData.articles,
                    loading: false
                });
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
        <div className= "container my-2">
            <h2 className="text-center">This is NewsMonkey API website</h2>
            {this.state.loading && <Spinner />}
            <div className="row">
                {this.state.articles? this.state.articles?.map((element) =>{
                    return <div className="col-md-3" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imgURL={element.urlToImage} newsURL={element.url}/>
                    </div>
                }):null}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default News