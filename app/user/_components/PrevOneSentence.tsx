import ProfileSentenceItem from '@/components/sentence/ProfileSentenceItem'
import Title from '@/components/shared/Title'

const mock = [
  {
    id: 1,
    createdAt: '2024.07.11(목) 23:32',
    content:
      '요즘엔 집에 와서 가족들과 집밥 먹는게 큰 낙이다. 정말 그 순간만큼은 안온과 행복을 함께 느끼는 중.',
    favorite: 5,
    comment: 4,
  },
  {
    id: 2,
    createdAt: '2024.07.11(목) 23:32',
    content:
      '감사와 휴식은 별개 인가. 내가 소유한 조건에 감사하면서도 쉬고 싶다는 마음이 간절하다. 놓아버리고 싶은',
    favorite: 5,
    comment: 4,
  },
  {
    id: 3,
    createdAt: '2024.07.11(목) 23:32',
    content:
      '내려간 감정 시소는 적극적으로 나의 포스팅을 읽어준 다른 직원 덕에 수평을 찾았다. 그는 내가 쓴 요소',
    favorite: 5,
    comment: 4,
  },
  {
    id: 4,
    createdAt: '2024.07.11(목) 23:32',
    content: '이틀을 잘 쉰 덕일것이다. 천천히 무엇을 하고 싶은지. 할 수 있는지를 가늠해보았다.',
    favorite: 5,
    comment: 4,
  },
  {
    id: 5,
    createdAt: '2024.07.11(목) 23:32',
    content:
      '조금 유별난 걸 꼽자면 역시 "무력한 기분" 일텐데, 하고 싶다는 순수한 욕구가 드는 건 읽기 뿐인 것 같다.',
    favorite: 5,
    comment: 4,
  },
]

export default function PrevOneSentence() {
  return (
    <div className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      <div className="flex flex-col">
        {mock.map((item) => (
          <ProfileSentenceItem sentence={item} />
        ))}
      </div>
    </div>
  )
}
