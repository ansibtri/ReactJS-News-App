import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <>
                <div className="my-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                                {source}
                            </span>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">{author == null ? '': `By ${author}`} {date}</small></p>
                            <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default NewsItem