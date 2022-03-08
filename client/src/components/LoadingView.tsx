import React, { ReactElement } from "react";
import styled from "styled-components";
import { LoadingViewBody, LoadingViewTitle } from "../helper/lib";
import { Theme } from "../helper/theme";
import { Metrics } from "../helper/metrics";

const StyledLoadingView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
`;

const StyledLoadingViewSpinnerContainer = styled.div`
  margin: 64px auto;
`;

const StyledSpinnerContainer = styled.div`
  position: relative;
  margin: auto;

  @keyframes fuelspinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface StyledSpinnerProps {
  theme: Theme;
  primaryColor: string;
  backgroundColor?: string;
  size: number;
}

const StyledSpinner = styled.div<StyledSpinnerProps>`
  height: ${(p): number => p.size}px;
  width: ${(p): number => p.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinnerAnimation = styled.div<StyledSpinnerProps>`
  animation: fuelspinner 1.5s linear infinite;
  border: 4px solid ${"white"};
  border-top-color: ${"black"};
  border-radius: 50%;
  box-sizing: border-box;
  content: "";
  height: ${(p): number => p.size}px;
  position: absolute;
  width: ${(p): number => p.size}px;
  z-index: 1;
  display: inline-block;
`;

const LoadingSpinnerAnimationWaiting = styled(LoadingSpinnerAnimation)`
  border-top-color: white;
`;

const LoadingSpinnerAnimationSlow = styled(LoadingSpinnerAnimation)`
  animation: fuelspinner 3s linear infinite;
`;

const StyledSpinnerImage = styled.img`
  max-width: 50%;
  max-height: 50%;
`;

export function LoadingSpinner(props: SpinnerProps): ReactElement {
  const { img, alt, waiting, slow, primaryColor, backgroundColor, size } =
    props;
  let spinner;
  if (waiting) {
    spinner = (
      <LoadingSpinnerAnimationWaiting
        className={props.className}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        size={size}
      />
    );
  } else if (slow) {
    spinner = (
      <LoadingSpinnerAnimationSlow
        className={props.className}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        size={size}
      />
    );
  } else {
    spinner = (
      <LoadingSpinnerAnimation
        className={props.className}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        size={size}
      />
    );
  }

  return (
    <StyledSpinnerContainer>
      <StyledSpinner
        className={props.className}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        size={size}
      >
        {spinner}
        <StyledSpinnerImage src={img} alt={alt} />
      </StyledSpinner>
    </StyledSpinnerContainer>
  );
}

interface SpinnerProps {
  img?: string;
  alt?: string;
  waiting: boolean;
  slow: boolean;
  primaryColor: string;
  backgroundColor?: string;
  size: number;
  className?: string;
}

LoadingSpinner.defaultProps = {
  primaryColor: null,
  size: 32,
  waiting: false,
  slow: false,
};

const PaddedText = styled.div`
  padding: 0 ${Metrics.defaultPadding};
`;

export function LoadingView(props: Props): ReactElement {
  const { title, body } = props;

  return (
    <StyledLoadingView>
      <StyledLoadingViewSpinnerContainer>
        <LoadingSpinner size={192} {...props} />
      </StyledLoadingViewSpinnerContainer>
      <PaddedText>
        <LoadingViewTitle>{title}</LoadingViewTitle>
        <LoadingViewBody>{body}</LoadingViewBody>
      </PaddedText>
    </StyledLoadingView>
  );
}

interface Props {
  img?: string;
  alt?: string;
  title: string;
  body?: string;
  waiting: boolean;
  slow: boolean;
  size?: number;
}

LoadingView.defaultProps = {
  title: "",
  waiting: false,
  slow: false,
  size: 192,
};
