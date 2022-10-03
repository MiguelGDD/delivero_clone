import sanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: '478lo5rz',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-10-02',
})

// https://deliverocloneexpo.sanity.studio/

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export default client


// *[_type == "featured" ]{
//   ...,
//   restaurants[]->{
//     ...,
//     dishes[]->,
// type-> {
// name
// }
//   },
// }[0]