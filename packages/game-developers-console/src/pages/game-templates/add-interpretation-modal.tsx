import * as React from 'react'

import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { useFormik } from 'formik'

import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import {
   InterpretationCreateForm,
   InterpretationFormValues,
   validateInterpretation,
} from 'modules/template/interpretation-create-form'

interface IProps {
   open: boolean
   onClose: () => void
}

export const AddInterpretationModal: React.FC<IProps> = ({ open, onClose }) => {
   const formik = useFormik<InterpretationFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         tags: [],
         src: null,
      },
      validate: validateInterpretation,
      onSubmit: async (values, { setSubmitting }) => {
         setSubmitting(true)
         try {
            console.log(values)
         } finally {
            setSubmitting(false)
         }
      },
   })

   return (
      <Modal
         open={open}
         onClose={() => {
            onClose()
            formik.resetForm()
         }}
         title="Add interpretation"
         className="text-white"
         maxWidth="2xl"
      >
         <div className="p-4 flex flex-col gap-4 pb-8">
            <InterpretationCreateForm formik={formik} />
            <Button variant="light" className="mt-7" onClick={formik.submitForm}>
               <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> add interpretation
            </Button>
         </div>
      </Modal>
   )
}
