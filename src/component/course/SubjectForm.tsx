import { formStyles } from '@/styles/form.styles';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Controller } from 'react-hook-form';
import useClasses from '@/hook/useClasses';

import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormGetValues
} from 'react-hook-form';
import { SubjectCreate } from '@/types/api';

interface SubjectFormProps {
  form: {
    control: Control<SubjectCreate>;
    handleSubmit: UseFormHandleSubmit<SubjectCreate>;
    getValues: UseFormGetValues<SubjectCreate>;
    formState: {
      errors: FieldErrors<SubjectCreate>;
    };
  };
  isLoading: boolean;
  onSubmit: (_data: SubjectCreate) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  form: {
    control,
    handleSubmit,
    formState: { errors }
  },
  isLoading,
  onSubmit
}) => {
  const { allClasses } = useClasses();

  return (
    <Container maxWidth="md">
      <Box my={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="bg-black">
          <Box mb={2}>
            <Typography component="label" sx={formStyles.label} htmlFor="title">
              Subject Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title" // Added id for accessibility
                  fullWidth
                  error={!!errors?.title}
                  helperText={
                    (errors?.title?.message as string) ||
                    'Please enter a subject title.'
                  }
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Typography
              component="label"
              sx={formStyles.label}
              htmlFor="overview"
            >
              Subject Overview
            </Typography>
            <Controller
              name="overview"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="overview" // Added id for accessibility
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors?.overview}
                  helperText={
                    (errors?.overview?.message as string) ||
                    'Please provide an overview.'
                  }
                />
              )}
            />
          </Box>
          <Box>
            <Typography
              component="label"
              sx={formStyles.label}
              htmlFor="class_id"
            >
              Class
            </Typography>
            <Controller
              name="class_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="class_id"
                  fullWidth
                  error={!!errors?.class_id}
                  inputProps={{
                    style: { borderRadius: 8 }
                  }}
                >
                  {allClasses?.map(classroom => (
                    <MenuItem key={classroom.id} value={classroom.id ?? ''}>
                      {classroom.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        </Box>
        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          variant="contained"
          sx={formStyles.button}
          endIcon={<SendIcon />}
        >
          {isLoading && 'Saving...'}
        </Button>
      </Box>
    </Container>
  );
};

export default SubjectForm;
