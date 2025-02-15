import * as React from 'react'

import { useFormContext } from 'react-hook-form'

import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'

export interface SubmitButtonProps extends ButtonProps {
  /**
   * Disable the submit button if the form is untouched.
   *
   * Change the default behavior by updating
   * `SubmitButton.defaultProps.disableIfUntouched`
   */
  disableIfUntouched?: boolean
  /**
   * Disable the submit button if the form is invalid.
   *
   * Change the default behavior by updating
   * `SubmitButton.defaultProps.disableIfInvalid`
   */
  disableIfInvalid?: boolean
}
/**
 * A button with type submit and default color scheme primary and isLoading state when the form is submitting.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 */
export const SubmitButton = forwardRef<SubmitButtonProps, 'button'>(
  (props, ref) => {
    const {
      children = 'Submit',
      disableIfUntouched,
      disableIfInvalid,
      isDisabled: isDisabledProp,
      isLoading,
      ...rest
    } = props
    const { formState } = useFormContext()

    const isDisabled =
      (disableIfUntouched && !formState.isDirty) ||
      (disableIfInvalid && !formState.isValid) ||
      isDisabledProp

    return (
      <Button
        {...rest}
        ref={ref}
        type="submit"
        isLoading={formState.isSubmitting || isLoading}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    )
  }
)

SubmitButton.defaultProps = {
  variant: 'primary',
  disableIfUntouched: false,
  disableIfInvalid: false,
}

SubmitButton.displayName = 'SubmitButton'
