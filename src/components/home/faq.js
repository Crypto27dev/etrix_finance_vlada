import React from "react";
import Reveal from 'react-awesome-reveal';
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { fadeInUp } from '../../utils';

const data = [
  {
    title: "What is Etrix?",
    description: "Etrix is a conceptualized as a smart technologies-anchored ecosystem aimed at solving the current problems associated with current conventional crypto trading & transaction processing services, including the delay in payment processing, fraudulent transactions, and expensive transactions costs."
  },
  {
    title: "Why choose us?",
    description: "Guaranteed allocation, stringent quality control and escrow-based token unlocks (for projects) help ensure that every project launch is successful"
  },
  {
    title: "What are the use cases of ETR token?",
    description: `The Etrix token has a variety of uses, some available at launch, and some from future projects in the ecosystem. Here's what's available at launch:
    Etrix acts as your membership card to The Etrix Ecosystem. The more Etrix you have, the higher tier of guaranteed allocation in new projects you'll receive.
    Etrix token acts as a settlement currency, allowing for rounds of funding to be completed seamlessly.
    Etrix token acts as a liquidity relay. Projects that successfully launch will be seeded with Etrix on external AMMs, allowing for exposure to yield for LPs, and giving more liquidity to projects exactly when they need it.`
  },
  {
    title: "What exactly is the Etrix Ecosystem?",
    description: "In a nutshell, it's a battle-tested DeFi protocols, enhanced to smooth out the kinks, bright together in one spot to make real world DeFi easy."
  },
  {
    title: "Will Etrix make me rich?",
    description: `We don't know, and we won't make any promises about returns on ANY project. While we are working with financial tech, our success won't be measured strictly by a return on investment, but on incubating and releasing projects which have the ability to stand the test of time.
    As always, only invest money that you're willing to lose, and try not to overextend yourself. If you're having trouble with managing your investments, please check out our resources section for guides, tips, and more.`
  },
  {
    title: "Is Etrix a fork of Libero?",
    description: `Etrix shares some features similar to the likes of Libero, with a taxing system on buy and sell to redistribute to the protocol's stability. However, our developers have grounded up the code and made innovated changes that make our overall goal and implementation of such tokenomics to be very different.`
  },
  {
    title: "What exactly is the Etrix Ecosystem?",
    description: "In a nutshell, it's a battle-tested DeFi protocols, enhanced to smooth out the kinks, bright together in one spot to make real world DeFi easy."
  },
  {
    title: "Is there anything else I should know?",
    description: `Yes. We'll say this right here, right now, in plain English so that there's no questions...
    There's a real chance of any investment you make in a project not generating a return. Even if everything is built right external market forces can work to bring down perfectly good projects.
    Only invest money that you're willing to lose, and don't overextend yourself.`
  },
  {
    title: "What is APY and how is calculated?",
    description: `APY is Annual Percent Yield and represents the total interest rate, or our own case rewards yielded over a full year.
    The formula for APY = (1+R)^(tf)-1`
  }
]

const Faq = () => {
  return (
    <div className="relative">
      <img className="bg-icon3" src="./img/icons/bg-icon.png" alt=""></img>
      <div className='faq-light'>
        <div className='flash-light'></div>
      </div>
      <div className='token-star-group'>
        <img className='star1' src="./images/banner/star.png" alt="" />
        <img className='star2' src="./images/banner/star.png" alt="" />
        <img className='star3' src="./images/banner/star.png" alt="" />
        <img className='star4' src="./images/banner/small-star.png" alt="" />
        <img className='star5' src="./images/banner/small-star.png" alt="" />
        <img className='star6' src="./images/banner/small-star.png" alt="" />
        <img className='star7' src="./images/banner/small-star.png" alt="" />
        <img className='star8' src="./images/banner/small-star.png" alt="" />
        <img className='star9' src="./images/banner/small-star.png" alt="" />
        <img className='planet' src="./images/banner/planet.png" alt="" />
        <img className='planet2' src="./images/banner/planet2.png" alt="" />
        <img className='line' src="./images/banner/line1.png" alt="" />
      </div>
      <Container>
        <div className="faqs_block mt-[50px] mb-[80px]">
          <div className="faqs_inner">
            <Row className="justify-content-center">
              <Col xs={12} lg={9} className="text-center">
                <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                  <h3 className="text-[50px] md:text-[40px] font-semibold text-white text-center">Frequently <span className='app-color'>Asked</span> Questions</h3>
                </Reveal>
              </Col>
            </Row>

            <Row className="justify-content-center mt-4">
              <Col xs={12} lg={9}>
                <Accordion>
                  <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={300} triggerOnce cascade>
                    {data.map((item, id) => (
                      <Accordion.Item eventKey={id} key={id}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body className="pt-1">
                          {item.description}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Reveal>
                </Accordion>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
      <img className="bg-icon4" src="./img/icons/bg-icon.png" alt=""></img>
    </div>
  )
}

export default Faq;