'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import FormSubmissionWidget from '@components/FormSubmission/Landing/widgets/Default';

const FormSubmission = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/form-submission');

  useEffect(() => {
    setMenu('form-submission');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <FormSubmissionWidget />;
};

export default FormSubmission;
