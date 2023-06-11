import Link from 'next/link'
import Layout from '../components/Layout'
import WebcamVideo from '../components/webcam/WebcamVideo'
import Users from '../components/users/users'

const IndexPage = () => (
  <Layout title="Приложение для записи уроков">
    <Users/>
  </Layout>
)

export default IndexPage
