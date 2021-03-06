import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { SiteLinkCard } from '../Components/Card';
import Loading from '../Components/Loading';
import '../Styles/ListingsOffersPage.css';
import defaultImage from '../Images/shield.svg';

// TODO: defaultImage should be replaced by image of listing

const ListingsOffersPage = () => {
  return (
    <div className='page page-offers'>
      <Query
        query={gql`
            {
              items {
                name
                id
                category
              }
            }
          `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>Error :(</p>;
          return data.items.map(item => (
            <SiteLinkCard link={`/offers/${item.id}`} key={item.id}>
              <div className='image-wrapper'>
                <img src={defaultImage} alt='shield'/>
              </div>
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </SiteLinkCard>
          ));
        }}
      </Query>
    </div>
  )
};

export default ListingsOffersPage;
