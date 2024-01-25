import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import Img from '../../../components/lazyloadimg/img';
import Avatar from "../../../assets/avatar.png";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./style.scss"
const Cast = ({ credits, loading }) => {
    const castContainer = useRef();

    const url = useSelector((state) => state.home.url);      // because it holds half of url for images we stored that url into store state url

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const navigation = (direction) => {
        const container = castContainer.current;    // this will select the div in which we provided a ref
        const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20)   // here we subtracting the scrollLeft of container with the total width of container so it can move. (+20) because of gap between the conatiner cards

            : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    return (
        <div className='castSection'>

            <ContentWrapper>

                <BsFillArrowLeftCircleFill
                    className='carouselLeftNav arrow'
                    onClick={() => navigation("left")}  // on click of left arrow we sending the 'left' to function
                />
                <BsFillArrowRightCircleFill
                    className='carouselRightNav arrow'
                    onClick={() => navigation("right")}
                />

                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems" ref={castContainer}>
                        {credits?.map((item) => {
                            let ImageUrl = item.profile_path ?
                                url.profile + item.profile_path
                                : Avatar;

                            return (
                                <div key={item.id}
                                    className="listItem">
                                    <div className="profileImg">
                                        <Img src={ImageUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            )
                        })}
                    </div>

                ) : (<div className="castSkeleton">
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast
