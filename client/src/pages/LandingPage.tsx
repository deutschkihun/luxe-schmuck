import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BodySection,
  SubTitle,
  VideoContent,
  VideoShowCase,
} from "../helper/lib";
import show from "../video/show.mp4";
import lv from "../video/lv.mp4";
import watch from "../video/watch.mp4";

// register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const LandingPage = (): JSX.Element => {
  const refSlide1 = useRef(null);
  const refSlide2 = useRef(null);
  const refSlide3 = useRef(null);
  const revealRef1 = useRef(null);
  const revealRef2 = useRef(null);

  useEffect(() => {
    const sections = [refSlide1, refSlide2].map((ref) => ref.current);

    const triggers = sections.map((panel) => {
      return ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });

    const snap = ScrollTrigger.create({
      snap: 1 / (sections.length - 1),
    });

    return function cleanup() {
      triggers.map((trigger) => trigger.kill());
      snap.kill();
    };
  }, []);

  useEffect(() => {
    const texts = [revealRef1, revealRef2].map((ref) => ref.current);

    gsap.from(refSlide1.current, {
      duration: 1,
      autoAlpha: 0,
      ease: "none",
      delay: 0.7,
    });

    texts.forEach((el) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 3,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <BodySection ref={refSlide1}>
        <VideoShowCase>
          <video src={watch} autoPlay muted loop controls={true}></video>
        </VideoShowCase>
        <VideoContent>
          <SubTitle>NEW IN</SubTitle>
          <h3>Explore latest collection of the season curated for you</h3>
          <Link to="/product">VIEW</Link>
        </VideoContent>
      </BodySection>

      <BodySection ref={refSlide2}>
        <VideoShowCase>
          <video src={lv} autoPlay muted loop controls={true}></video>
        </VideoShowCase>
        <VideoContent>
          <h1 className="section__content__title">NEW IN</h1>
          <h3>Explore latest collection of the season curated for you</h3>
          <Link to="/product">VIEW</Link>
        </VideoContent>
      </BodySection>

      <BodySection ref={refSlide3}>
        <VideoShowCase>
          <video
            src={show}
            autoPlay
            muted
            loop
            controls
            style={{ pointerEvents: "unset" }}
          ></video>
        </VideoShowCase>
        <VideoContent>
          <h1 className="section__content__title">NEW IN</h1>
          <h3>Explore latest collection of the season curated for you</h3>
          <Link to="/product">VIEW</Link>
        </VideoContent>
      </BodySection>
    </>
  );
};
