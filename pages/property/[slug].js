import { sanityClient } from "../../sanity";
import { isMultiple } from "../../utils";

export const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) => {
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <h2>
        <b>
          {propertyType} hosted by {host?.name}
        </b>
      </h2>
      <h3>
        {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)}
      </h3>
      <hr />
      <h4>Enhanced Clean</h4>
      <p>
        This host is committed to AirBnb&apos;s 5-step enhanced cleaning
        process. Why is this so hard.
      </p>
      <h4>Amenities for everyday living</h4>
      <p>The host has equipped this property with everything!</p>
      <h4>Enhanced Clean</h4>
      <p>
        This host is committed to AirBnb&apos;s 5-step enhanced cleaning
        process.
      </p>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[_type == "property" && slug.current == $pageSlug][0]{
        title,
        location,
        propertyType,
        mainImage,
        images,
        pricePerNight,
        beds,
        bedrooms,
        description,
        host->{
            _id,
            name,
            slug,
            image
        },
        reviews[]{
            ...,
            traveller->{
                _id,
                name,
                slug,
                image
            }
        }
    }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
      },
    };
  }
};

export default Property;
