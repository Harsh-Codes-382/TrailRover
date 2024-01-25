import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentWrapper from '../../components/contentWrapper/contentWrapper';
import noResults from '../../assets/no-results.png'
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';
import "./style.scss";

const SearchResult = () => {
  const [data, setData] = useState(null)    // this state will hold all the data which will come from api call
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();
  const navigate = useNavigate();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);    // So every Time api call occur we will set the pageNum + 1.  So,   we can get the next page data from api Because we sent the pageNum state in api url   
        setLoading(false);
      })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((nextdata) => {
        if (data?.results) {  // Means agr toh data hai phele se joh ki pichle pageNum ka hoga or tbh next page ki api call horhi hai then 
          setData({   // Set krdo data mai
            ...data,  // jo phele se hai voh bhi and
            results: [...data?.results, ...nextdata?.results] // merge krdo next page ka data purane data mai (nextdata.results = means next page ka data hai)
          })
        }
        else {
          setData(nextdata)   // Means phele se kuch bhi data nhi hai toh joh results is pageNum pr api call se aye hain vhi data mai set hojaye
        }
        setPageNum((prev) => prev + 1);
      })
  }

  useEffect(() => {
    setPageNum(1);    // Every Time query changes our pageNum should start from 1
    fetchInitialData(); // Means this func() will be called Everytime when query Changes & with also diff. pageNum

  }, [query])  // Dependency is query means this will occur everyTime query Changes 


  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {` Search ${data?.total_results > 1 ? "results" : "result"} of  '${query}' `}
              </div>
              <InfiniteScroll className='content'
                dataLength={data?.results?.length || []} // Yeh dera hai ki ek baari mai kitni length ka data arra hai & because Initially data undefined hota hai toh empty array hoga dataLength

                next={fetchNextPageData}  // It will take the method which fetch the result for next page

                hasMore={pageNum <= data?.total_pages}  // hasMore means kb tk infinite scroll chlana hai & acc. to condition jb tk pageNum last page ke equal ya less than hai jb tk hi chlaye scroll

                loader={<Spinner />}


              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;    //Means if somebody searches person name then it will not show any result
                  return (
                    <MovieCard
                      key={index}
                      data={item} // Particular movie object details we are passing
                      fromSearch={true}
                    />
                  )
                })}
              </InfiniteScroll>


            </>

          ) : (
            <span className="resultNotFound">
              Sorry, Results not found
              <span className='back' onClick={() => navigate('/')}> Click To HomePage</span>

            </span>
          )}
        </ContentWrapper>
      )}

    </div>
  )
}

export default SearchResult
