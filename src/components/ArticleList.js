import React from 'react'
import ArticleItem from './ArticleItem';

const ArticleList = ({articles}) => {
  
    const articleItems = articles.map((article, index) => {
      return <ArticleItem key={index} article={article} />
    })

    return (
    <div>
    {articleItems}
    </div>
       
    )

}







export default ArticleList;