import React, { useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'    // search icon
import { SlMenu } from "react-icons/sl";    // hamburger menu icon
import { VscChromeClose } from "react-icons/vsc";   // close icon 
import { useNavigate, useLocation } from 'react-router-dom';
import "./style.scss";
import ContentWrapper from "../contentWrapper/contentWrapper";
import logo from "../../assets/movies-logo.png";


const Header = () => {
  const [show, setshow] = useState("top");    // to show the header on top or not
  const [lastscrollY, setlastScrollY] = useState(0);    // on scroll hide the header or not
  const [menu, setmenu] = useState(false);    // to show the menu at appropriate width of screen
  const [query, setQuery] = useState("");   // to get the search results
  const [showsearch, setShowSearch] = useState("");   // to show the search bar on click
  // Creating the instance of these hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);   // we are setting our scroll to top everytime location changes 
    // location holds the location of user like path etc. and everytime you navigate on different page but your scroller remain down there where you left so, to get the scroll to top everytime on changing the path  we change the scroll to top when our locations change 

  }, [location])


  const controlNavigation = () => {
    if (window.scrollY > 200) {
      // on scroll down scrollY value will be greater and lastScrollY is behind from scrollY
      // but on scroll Up lastScrollY value will be greater than scrollY.
      if (window.scrollY > lastscrollY && !menu) {
        setshow('hide');
      }
      else {
        setshow('show')
      }

    }
    else {
      setshow('top');   //if scrollY less than 200 then "top" will be add
    }
    setlastScrollY(window.scrollY);   // we are storing the latest scroll amount into state so when user scroll up then scrollY will be less than the stored value of lastscrollY and setshow('show') will execute

  }


  useEffect(() => {
    window.addEventListener('scroll', controlNavigation);
    // it is a tip that everytime you addEvent then you should return a removeEvent too because of a case of memory leakage in console
    return () => {
      window.removeEventListener('scroll', controlNavigation);
    }
  }, [lastscrollY])


  const openSearch = () => {
    setShowSearch(true);
    setmenu(false);

  }

  const showmenu = () => {
    setShowSearch(false);
    setmenu(true);
  }

  const SearchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  };

  const NavigationHandler = (value) => {
    if (value === "movie") {
      navigate("/explore/movie");
    }
    else {
      navigate("/explore/tv")
    }
    setmenu(false);
  }

  return (
    <header className={`header ${menu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="Movies World" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => NavigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => NavigationHandler("tv")}>Tv Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {menu ? (<VscChromeClose onClick={() => setmenu(false)} />) : (<SlMenu onClick={showmenu} />)}
        </div>
      </ContentWrapper>
      {showsearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input type="text" placeholder='Search Your Movie' onChange={(e) => setQuery(e.target.value)} onKeyUp={SearchQueryHandler} />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}


    </header>
  )
}

export default Header
