import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title, description, imgURL, newsURL} = this.props
        return (
            <div>
                <div className="card">
                    <img src={!imgURL?"https://bsmedia.business-standard.com/_media/bs/img/about-page/thumb/464_464/1634638547.jpg":imgURL} className="card-img-top" alt="Card im cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsURL} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem