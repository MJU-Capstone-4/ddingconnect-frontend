import { useState } from 'react';

import { Chip } from '@/shared/ui';

const jobCategories = ['프론트엔드', '백엔드', '디자인', 'PM', 'AI/ML'];
const careerFilters = ['신입', '1~3년', '3~5년', '5년 이상'];
const regionFilters = ['서울', '경기', '인천', '부산', '대전', '대구'];
const serviceCategories = ['전체', '커피챗', '로드맵', 'QnA', '채용정보'];
const qnaCategories = ['개발', '디자인', '기획', '취업', '이직', '기타'];
const pointOptions = ['1,000P', '3,000P', '5,000P', '10,000P'];

export function HomePage() {
  const [selectedJob, setSelectedJob] = useState('프론트엔드');
  const [selectedCareer, setSelectedCareer] = useState('신입');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['서울']);
  const [selectedService, setSelectedService] = useState('전체');
  const [selectedQna, setSelectedQna] = useState('개발');
  const [selectedPoint, setSelectedPoint] = useState('3,000P');

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region],
    );
  };

  return (
    <div className="flex flex-col gap-8 px-page-x py-page-y">
      <h1>Chip 컴포넌트 예시</h1>

      <section className="flex flex-col gap-3">
        <h2>직무 선택 (outlined)</h2>
        <div className="flex flex-wrap gap-2">
          {jobCategories.map((job) => (
            <Chip
              key={job}
              variant="outlined"
              size="md"
              active={selectedJob === job}
              onClick={() => setSelectedJob(job)}
            >
              {job}
            </Chip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>경력 필터 (outlined)</h2>
        <div className="flex flex-wrap gap-2">
          {careerFilters.map((career) => (
            <Chip
              key={career}
              variant="outlined"
              size="sm"
              active={selectedCareer === career}
              onClick={() => setSelectedCareer(career)}
            >
              {career}
            </Chip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>지역 필터 (soft, 다중 선택)</h2>
        <div className="flex flex-wrap gap-2">
          {regionFilters.map((region) => (
            <Chip
              key={region}
              variant="soft"
              size="sm"
              active={selectedRegions.includes(region)}
              onClick={() => toggleRegion(region)}
            >
              {region}
            </Chip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>홈 카테고리 (filled, lg)</h2>
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((service) => (
            <Chip
              key={service}
              variant="filled"
              size="lg"
              active={selectedService === service}
              onClick={() => setSelectedService(service)}
            >
              {service}
            </Chip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>QnA 카테고리 (filled)</h2>
        <div className="flex flex-wrap gap-2">
          {qnaCategories.map((cat) => (
            <Chip
              key={cat}
              variant="filled"
              size="md"
              active={selectedQna === cat}
              onClick={() => setSelectedQna(cat)}
            >
              {cat}
            </Chip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>포인트 충전 (filled)</h2>
        <div className="flex flex-wrap gap-2">
          {pointOptions.map((point) => (
            <Chip
              key={point}
              variant="filled"
              size="sm"
              active={selectedPoint === point}
              onClick={() => setSelectedPoint(point)}
            >
              {point}
            </Chip>
          ))}
        </div>
      </section>
    </div>
  );
}
