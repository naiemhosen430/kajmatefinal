"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Typography, Container, IconButton, Grid, Box } from '@mui/material';
import axios from 'axios';
import validator from 'validator';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getApiCall, postApiCall } from '@/api/fatchData';
import { AuthContex } from '@/context/AuthContex';

const steps = ['Basic Information', 'Professional and Education Info', 'Billing Info', 'Confirmation'];

function getStepContent(step, formData, handleChange, handleAddField, handleRemoveField) {
  switch (step) {
    case 0:
      return (
        <div>
          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={formData.email}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
        </div>
      );
    case 1:
      return (
        <div>
          <TextField
            label="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="About Me"
            name="aboutme"
            value={formData.aboutme}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <Typography variant="h6" style={{ marginTop: 20, color: 'white' }}>Education</Typography>
          {formData.educations.map((education, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Institute ${index + 1}`}
                  name={`institute-${index}`}
                  value={education.institute}
                  onChange={(e) => handleChange(e, index, 'educations', 'institute')}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Degree ${index + 1}`}
                  name={`degree-${index}`}
                  value={education.degree}
                  onChange={(e) => handleChange(e, index, 'educations', 'degree')}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label={`Year ${index + 1}`}
                  name={`year-${index}`}
                  value={education.year}
                  onChange={(e) => handleChange(e, index, 'educations', 'year')}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label={`Grade ${index + 1}`}
                  name={`grade-${index}`}
                  value={education.grade}
                  onChange={(e) => handleChange(e, index, 'educations', 'grade')}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveField(index, 'educations')}
                  disabled={formData.educations.length <= 1}
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <IconButton
            color="primary"
            onClick={() => handleAddField('educations')}
            style={{ marginTop: 10 }}
          >
            <AddIcon />
            Add Education
          </IconButton>

          <Typography variant="h6" style={{ marginTop: 20, color: 'white' }}>Experience</Typography>
          {formData.experiences.map((experience, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Company ${index + 1}`}
                  name={`company-${index}`}
                  value={experience.company}
                  onChange={(e) => handleChange(e, index, 'experiences', 'company')}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label={`Start Date ${index + 1}`}
                  name={`startDate-${index}`}
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => handleChange(e, index, 'experiences', 'startDate')}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label={`End Date ${index + 1}`}
                  name={`endDate-${index}`}
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => handleChange(e, index, 'experiences', 'endDate')}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label={`Description ${index + 1}`}
                  name={`description-${index}`}
                  value={experience.description}
                  onChange={(e) => handleChange(e, index, 'experiences', 'description')}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveField(index, 'experiences')}
                  disabled={formData.experiences.length <= 1}
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <IconButton
            color="primary"
            onClick={() => handleAddField('experiences')}
            style={{ marginTop: 10 }}
          >
            <AddIcon />
            Add Experience
          </IconButton>
        </div>
      );
    case 2:
      return (
        <div>
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{ shrink: true }}
            required
          />
        </div>
      );
    case 3:
      return (
        <div>
          <Typography variant="h6" style={{ color: 'white' }}>Profile Update Successful!</Typography>
          <Typography style={{ color: 'white' }}>Your profile has been successfully updated.</Typography>
        </div>
      );
    default:
      return 'Unknown step';
  }
}

export default function EditProfilePage() {
  const [activeStep, setActiveStep] = useState(0);
  const { state } = useContext(AuthContex);
  const user = state?.user;

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    profession: '',
    aboutme: '',
    location: '',
    birthday: '',
    educations: [{ institute: '', degree: '', year: '', grade: '' }],
    experiences: [{ company: '', startDate: '', endDate: '', description: '' }],
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, ...user });
    } else {
      getApiCall('auth/me').then((res) => { setFormData({ ...formData, ...res.data }); });
    }
  }, [user]);

  const handleChange = (e, index, fieldType, field) => {
    const { name, value } = e.target;
    if (fieldType) {
      const updatedFields = [...formData[fieldType]];
      updatedFields[index][field] = value;
      setFormData({ ...formData, [fieldType]: updatedFields });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (fieldType) => {
    if (fieldType === 'educations') {
      setFormData({
        ...formData,
        educations: [...formData.educations, { institute: '', degree: '', year: '', grade: '' }],
      });
    } else if (fieldType === 'experiences') {
      setFormData({
        ...formData,
        experiences: [...formData.experiences, { company: '', startDate: '', endDate: '', description: '' }],
      });
    }
  };

  const handleRemoveField = (index, fieldType) => {
    if (fieldType === 'educations') {
      const updatedEducations = [...formData.educations];
      updatedEducations.splice(index, 1);
      setFormData({ ...formData, educations: updatedEducations });
    } else if (fieldType === 'experiences') {
      const updatedExperiences = [...formData.experiences];
      updatedExperiences.splice(index, 1);
      setFormData({ ...formData, experiences: updatedExperiences });
    }
  };

  const handleSubmit = async () => {
    // Add form validation here
    if (!formData.fullname || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    if (!validator.isEmail(formData.email)) {
      alert('Invalid email format');
      return;
    }

    // Send form data to the server
    try {
      await postApiCall('auth/update', formData);
      setActiveStep(activeStep + 1); 
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: '#121212', padding: '20px' }}>
      <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: 'transparent' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel style={{ color: 'white' }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{getStepContent(activeStep, formData, handleChange, handleAddField, handleRemoveField)}</div>
      <Box display="flex" justifyContent="space-between" marginTop={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setActiveStep((prevStep) => prevStep - 1)}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Finish
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setActiveStep((prevStep) => prevStep + 1)}
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
}
