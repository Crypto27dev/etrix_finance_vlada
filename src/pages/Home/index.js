import { ScrollingProvider, Section } from 'react-scroll-section';
import MainHeader from '../../components/menu/MainHeader';
import MainFooter from '../../components/menu/MainFooter';
import Banner from '../../components/home/banner';
import Who from '../../components/home/who';
import Tokenomics from '../../components/home/tokenomics';
import RoadMap from '../../components/home/roadmap';
import Faq from '../../components/home/faq';
import Team from '../../components/home/team';
import Swap from '../../components/home/swap';
import './home.scss';

const Home = () => {
  return (
    <div className='home'>
      <ScrollingProvider offset={-65}>
        <MainHeader />
        <Section id="section1">
          <Banner />
        </Section>
        <Section id="section2">
          <Who />
        </Section>
        <Section id="section3">
          {/* <Tokenomics /> */}
          <Swap />
        </Section>
        <Section id="section4">
          <RoadMap />
        </Section>
        <Section id="section5">
          <Team />
        </Section>
        <Section id="section6">
          <Faq />
        </Section>
        <MainFooter />
      </ScrollingProvider>
    </div>
  )
}

export default Home;