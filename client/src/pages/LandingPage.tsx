import React, { useRef, useEffect } from "react";
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
import { DynamicHeader } from "../components/DynamicHeader";

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
          duration: 1,
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
      <DynamicHeader />
      <BodySection ref={refSlide1}>
        <VideoShowCase>
          <video
            src={watch}
            autoPlay
            muted
            loop
            style={{ width: "1920px", maxWidth: "1920px" }}
          ></video>
        </VideoShowCase>
        <VideoContent>
          <SubTitle style={{ color: "white", fontSize: "3rem" }}>
            WHAT IS NEW
          </SubTitle>
          <SubTitle style={{ color: "white", fontSize: "1.5rem" }}>
            Experience luxury products that you can only see on LUXE SCHUMCK.
          </SubTitle>
        </VideoContent>
      </BodySection>

      <BodySection ref={refSlide2}>
        <VideoShowCase>
          <video
            src={lv}
            autoPlay
            muted
            loop
            style={{ width: "1920px", maxWidth: "1920px" }}
          ></video>
        </VideoShowCase>
        <VideoContent>
          <SubTitle style={{ color: "white", fontSize: "3rem" }}>
            FOR WOMEN
          </SubTitle>
          <SubTitle style={{ color: "white", fontSize: "1.5rem" }}>
            Explore LUXE SCHMUCK&apos;s WOMEN products.
          </SubTitle>
        </VideoContent>
      </BodySection>

      <BodySection ref={refSlide3}>
        <VideoShowCase>
          <video
            src={show}
            autoPlay
            muted
            loop
            style={{ width: "1920px", maxWidth: "1920px" }}
          ></video>
        </VideoShowCase>
        <VideoContent>
          <SubTitle style={{ color: "white", fontSize: "3rem" }}>
            FOR MEN
          </SubTitle>
          <SubTitle style={{ color: "white", fontSize: "1.5rem" }}>
            Explore LUXE SCHMUCK&apos;s MEN products.
          </SubTitle>
        </VideoContent>
      </BodySection>
    </>
  );
};
