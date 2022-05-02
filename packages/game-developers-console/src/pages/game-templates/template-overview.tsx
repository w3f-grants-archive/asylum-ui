import * as React from 'react'

import classNames from 'classnames'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Hr } from 'components/hr'
import { SearchAutocomplete } from 'components/search-autocomplete'
import { Tag } from 'components/tag'
import { Heading } from 'components/text/heading'
import { HeadingLg } from 'components/text/heading-lg'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import hljs from 'highlight.js'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchTemplate, fetchTemplateInterpretationsMetadata } from 'api'
import { ReactComponent as ArrowLeftIcon } from 'assets/svg/arrow-left.svg'
import { ReactComponent as CheckmarkIcon } from 'assets/svg/checkmark.svg'
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import { useStore } from 'store'
import { formatAddress } from 'utils'

export const TemplateOverview: React.FC = observer(() => {
   const { id } = useParams()
   const navigate = useNavigate()
   const store = useStore()
   const [seeMore, setSeeMore] = React.useState(false)

   const [copied, setCopied] = React.useState(false)

   const copiedMessage = copied ? 'copied' : 'copy'
   const copiedIcon = copied ? <CheckmarkIcon /> : <CopyIcon />

   const { data: template } = useQuery(['templates', id], () => fetchTemplate(id || ''))
   const { data: interpretations } = useQuery(['interpretations', id], () =>
      fetchTemplateInterpretationsMetadata(id || '')
   )

   console.log(interpretations)

   if (!template) return null

   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">
               <div
                  onClick={() => navigate('/templates')}
                  className="flex gap-4 items-center cursor-pointer"
               >
                  <ArrowLeftIcon className="fill-white" />
                  Templates
               </div>
            </HeadingXl>
         </div>
         <Hr />
         <div className="py-6 flex flex-col gap-8">
            <Card>
               <div className="flex gap-9 mb-5">
                  <div className="flex gap-4 basis-7/12 justify-between">
                     <HeadingLg>{template.name}</HeadingLg>
                     <div className="font-secondary">
                        ID: <span className="font-light">{template.id}</span>
                     </div>
                  </div>
                  <div className="flex gap-9 basis-5/12">
                     <div className="font-secondary">
                        Issuer:{' '}
                        <span className="font-light">{formatAddress(template.issuer || '')}</span>
                     </div>
                  </div>
               </div>

               <div className="flex gap-9">
                  <div className="basis-7/12">
                     {/* <Paragraph className="mb-4">{game.shortDescription}</Paragraph> */}
                     <Carousel
                        className="demo-carousel overflow-hidden"
                        showIndicators={false}
                        showArrows={true}
                        showThumbs={true}
                        showStatus={false}
                     >
                        {[
                           <img
                              key={0}
                              src={template.img}
                              alt={template.name}
                              className="aspect-video object-cover object-center"
                           />,
                        ]}
                     </Carousel>
                  </div>
                  <div className="basis-5/12">
                     <Heading className="mb-4">Description</Heading>
                     <div className={classNames({ 'line-clamp-15': !seeMore })}>
                        {template?.description.split('\n').map((paragraph, index) => (
                           <Paragraph key={index} className="mb-3">
                              {paragraph}
                           </Paragraph>
                        ))}
                     </div>
                     <a
                        className={classNames(
                           'cursor-pointer underline text-base text-asylum-blue',
                           { hidden: seeMore }
                        )}
                        onClick={() => setSeeMore(true)}
                     >
                        See more
                     </a>
                  </div>
               </div>
            </Card>

            <div>
               <div className="flex justify-between items-center mb-6">
                  <HeadingXl className="text-white">Interpretations</HeadingXl>
                  <Button variant="light" onClick={() => {}}>
                     <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> add
                     interpretation
                  </Button>
               </div>
               <SearchAutocomplete onSelect={() => {}} className="mb-6" />

               <div className="flex flex-col gap-6 pb-40">
                  {interpretations?.map((interpretation) => (
                     <Card key={interpretation.interpretation.id} className="py-3 px-4 relative">
                        <div>
                           <div
                              className="flex gap-3 items-center basis-48 !absolute bottom-2 right-3 hover:bg-gray-200 cursor-pointer py-2 px-4 rounded-xl transition-all text-base flex items-center gap-2 font-secondary"
                              onClick={() => {
                                 navigator.clipboard.writeText(
                                    JSON.stringify(interpretation.metadata, null, 2)
                                 )
                                 setCopied(true)
                              }}
                           >
                              {copiedIcon} {copiedMessage}
                           </div>
                           <img
                              className="aspect-square object-cover object-center rounded-xl w-[170px] h-[170px] float-left mr-6"
                              src={interpretation.interpretation.src}
                              alt={interpretation.interpretation.id}
                           />
                           <div className="grow">
                              <Paragraph className="flex items-center mb-3 gap-1 justify-end">
                                 {interpretation.tags?.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                 ))}
                              </Paragraph>
                              <div>
                                 <div className="bg-white text-gray-700 text-sm rounded-xl">
                                    <pre
                                       className="hljs-json overflow-auto"
                                       dangerouslySetInnerHTML={{
                                          __html: hljs.highlight(
                                             'json',
                                             JSON.stringify(interpretation.metadata, null, 2)
                                          ).value,
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
})
