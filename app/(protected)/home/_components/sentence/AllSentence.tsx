'use client'

import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function AllSentence() {
  const { data: sentences } = useSuspenseQuery(
    sentenceQuery.getAllSentence(supabase),
  )

  return sentences.map((sentence) => (
    <Container key={sentence.id} className="flex flex-col gap-4">
      <Box row className="gap-2">
        <Avatar src={sentence?.avatar_url!} size="sm" />
        <Box col>
          <Title size="xs" type="sub">
            {sentence?.user_name}
            <Text as="span" size="sm" type="caption">
              {' '}
              님의 하루 한줄
            </Text>
          </Title>
          <Text size="sm">
            감정 농도
            <Text as="span" className="text-var-blue opacity-50">
              {' '}
              {sentence.emotion_level}
            </Text>
          </Text>
        </Box>
      </Box>
      <Box
        isBackground
        isRounded
        col
        className="gap-4 p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <Text>{sentence.content}</Text>
        <Box row className="flex-1 self-end">
          <Button
            variant="icon"
            size="icon"
            className="flex gap-2 border-none text-xs font-light"
          >
            <Icon size={16} view={150}>
              <path
                id="like"
                d="M129,57.86c0-17.04-13.6-30.86-30.38-30.86-9.55,0-18.06,6.72-23.62,13.71-5.57-7-14.08-13.71-23.62-13.71-16.78,0-30.38,13.82-30.38,30.86,0,6.34,1.88,12.24,5.12,17.14.71,1.08,7.48,9.38,8.38,10.28,9.41,9.37,40.5,37.71,40.5,37.71,0,0,35.62-33.78,46.54-44.93,4.98-5.09,7.46-12.47,7.46-20.21Z"
              />
            </Icon>
            {sentence.favorite ?? 0}
          </Button>
          <Button
            variant="icon"
            size="icon"
            className="flex gap-2 border-none text-xs font-light"
          >
            <Icon size={16} view={150}>
              <g id="income">
                <path d="M33,105h21v15l18-15h45c4.97,0,9-4.03,9-9v-57c0-4.97-4.03-9-9-9H33c-4.97,0-9,4.03-9,9v57c0,4.97,4.03,9,9,9Z" />
                <line x1="51" y1="57" x2="99" y2="57" />
                <line x1="51" y1="78" x2="99" y2="78" />
              </g>
            </Icon>
            0
          </Button>
        </Box>
      </Box>
    </Container>
  ))
}
