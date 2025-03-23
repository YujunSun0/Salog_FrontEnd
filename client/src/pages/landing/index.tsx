import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Header } from "src/components/Layout/Header";

// 이미지 임포트 유지
import landing1 from "src/assets/landing1.png";
import landing2 from "src/assets/landing2.png";
import landing3 from "src/assets/landing3.png";
import landing4 from "src/assets/landing4.png";
import landing5 from "src/assets/landing5.png";
import landing6 from "src/assets/landing6.png";
// import landing7 from "src/assets/landing7.png";

const Landing = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  // const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 스크롤 모니터링 및 애니메이션 효과
  useEffect(() => {
    AOS.init({
      once: true,
      useClassNames: true,
      animatedClassName: "aos-init aos-animate",
      offset: 350,
      duration: 800,
      easing: 'ease-in-out',
    });

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <Header />
      
      {/* 첫 번째 섹션: 메인 헤더 */}
      <HeroSection>
        <HeroContent>
          <Badges>
            <Badge>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3182f6" />
              </svg>
              사용자 친화적
            </Badge>
            <Badge>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3182f6" strokeWidth="2" />
                <path d="M16 10L11 15L8 12" stroke="#3182f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              편리한 기록
            </Badge>
          </Badges>
        
          <HeroTitle data-aos="fade-up">
            가계부와 추억을<br />한곳에서 관리하세요
          </HeroTitle>
          <HeroSubtitle data-aos="fade-up" data-aos-delay="100">
            샐로그에서 지출과 수입을 간편하게 기록하고<br />
            소중한 일상의 순간을 함께 남겨보세요.
          </HeroSubtitle>
          
          <div data-aos="fade-up" data-aos-delay="200">
            <StartButton onClick={() => {
              navigate("/login");
            }}>
              무료로 시작하기
            </StartButton>
            <SecondaryButton onClick={() => {
              const featuresSection = document.querySelector('#features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              자세히 알아보기
            </SecondaryButton>
          </div>
        </HeroContent>
        
        <HeroImageContainer data-aos="fade-left" data-aos-delay="300">
          <HeroImage src={landing1} alt="샐로그 메인 이미지" />
        </HeroImageContainer>
      </HeroSection>

      {/* 두 번째 섹션: 기능 소개 1 */}
      <FeatureSection id="features">
        <SectionHeader data-aos="fade-up">
          <SectionTitle>지출·수입 관리</SectionTitle>
          <SectionSubtitle>
            내 재정을 손쉽게 기록하고 분석해 보세요
          </SectionSubtitle>
        </SectionHeader>
        
        <FeatureContainer>
          <FeatureCard data-aos="fade-up" data-aos-delay="200">
            <FeatureImage src={landing2} alt="지출 내역 관리" />
            <FeatureTitle>직관적인 내역 관리</FeatureTitle>
            <FeatureDescription>
              지출과 수입을 간편하게 기록하고 한눈에 확인하세요.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard data-aos="fade-up" data-aos-delay="300">
            <FeatureImage src={landing3} alt="지출 분석" />
            <FeatureTitle>스마트한 자산 분석</FeatureTitle>
            <FeatureDescription>
              카테고리별 지출 패턴을 그래프로 확인하고 재정 상태를 파악하세요.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard data-aos="fade-up" data-aos-delay="400">
            <FeatureImage src={landing4} alt="알림 서비스" />
            <FeatureTitle>자동 알림 서비스</FeatureTitle>
            <FeatureDescription>
              고정 지출·수입을 등록하면 3일 전에 알림을 받을 수 있어요.
            </FeatureDescription>
          </FeatureCard>
        </FeatureContainer>
      </FeatureSection>

      {/* 세 번째 섹션: 기능 소개 2 */}
      <DiarySection>
        <DiaryContent>
          <div data-aos="fade-right">
            <SectionTitle>추억도 함께 기록해요</SectionTitle>
            <DiaryDescription>
              오늘 하루를 글과 사진으로 남기고<br />
              지출 내역과 함께 확인해 보세요.<br />
              당신의 일상이 더 특별해집니다.
            </DiaryDescription>
          </div>
        </DiaryContent>
        
        <DiaryImagesContainer data-aos="fade-left" data-aos-delay="200">
          <DiaryImageMain src={landing5} alt="다이어리 화면" />
          <DiaryImageSecondary src={landing6} alt="다이어리 작성 화면" />
        </DiaryImagesContainer>
      </DiarySection>

      {/* 네 번째 섹션: CTA */}
      <CTASection>
        <CTAContent data-aos="zoom-in">
          <CTATitle>지금 샐로그와 함께 시작하세요</CTATitle>
          <CTASubtitle>
            금융 기록과 추억을 한 곳에서 관리하는<br />
            새로운 경험을 만나보세요
          </CTASubtitle>
          <CTAButton onClick={() => {
            navigate("/login");
          }}>
            무료로 시작하기
          </CTAButton>
        </CTAContent>
      </CTASection>

      {showButton && (
        <ScrollTopButton onClick={scrollToTop}>
          TOP
        </ScrollTopButton>
      )}
    </Container>
  );
};

export default Landing;

// 스타일 컴포넌트
const Container = styled.div`
  overflow-x: hidden;
  color: #333;
  font-family: 'Pretendard';
  font-weight: 500;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rem 6rem 8rem;
  // min-height: 90vh;
  background: linear-gradient(120deg, #f8faff 0%, #e8f0ff 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 40%;
    height: 70%;
    background: radial-gradient(circle, rgba(147,178,255,0.12) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15%;
    left: 0;
    width: 40%;
    height: 70%;
    background: radial-gradient(circle, rgba(100,158,255,0.08) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 8rem 2rem 6rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1024px) {
    margin-bottom: 5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2rem;
  color: #191f28;
  letter-spacing: -0.03em;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.7;
  color: #4e5968;
  margin-bottom: 3.5rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StartButton = styled.button`
  background-color: #3182f6;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1.1rem 2.8rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(49, 130, 246, 0.15);
  
  &:hover {
    background-color: #1b64da;
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(49, 130, 246, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(49, 130, 246, 0.15);
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #3182f6;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1.1rem 2.5rem;
  border-radius: 10px;
  border: 1px solid #3182f6;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(49, 130, 246, 0.05);
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 48%;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: all 0.5s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(0) rotateX(0);
  }
`;

const Badges = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(49, 130, 246, 0.1);
  color: #3182f6;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-right: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }
`;

const FeatureSection = styled.section`
  padding: 8rem 4rem;
  background-color: white;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #191f28;
  margin-bottom: 2rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.5rem;
  color: #4e5968;
  max-width: 600px;
  margin: 0 auto;
`;

const FeatureContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  flex: 1;
  min-width: 300px;
  max-width: 380px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #191f28;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #4e5968;
`;

const DiarySection = styled.section`
  padding: 8rem 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fbff;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 6rem 2rem;
  }
`;

const DiaryContent = styled.div`
  max-width: 500px;
  
  @media (max-width: 1024px) {
    margin-bottom: 4rem;
    text-align: center;
  }
`;

const DiaryDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: #4e5968;
  margin-top: 1.5rem;
`;

const DiaryImagesContainer = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  
  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
`;

const DiaryImageMain = styled.img`
  position: absolute;
  width: 400px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  z-index: 2;
  
  @media (max-width: 1024px) {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: block;
  }
`;

const DiaryImageSecondary = styled.img`
  position: absolute;
  width: 300px;
  height: auto;
  top: 100px;
  left: 250px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #3182f6, #1b64da);
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
`;

const CTASubtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.8rem;
`;

const CTAButton = styled.button`
  background-color: white;
  color: #3182f6;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background-color: white;
  color: #3182f6;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 1.2rem 1rem;
  border-radius: 50%;
  border: 1px solid #e4e9f0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-5px);
  }
`;