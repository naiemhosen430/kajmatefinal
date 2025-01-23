import React from 'react';
import { Autocomplete, TextField, Button, Box, Typography } from '@mui/material';

export default function FilterBar({ filter_options, set_filter_options, allAreas, professions, onApply, onClose }) {
  return (
    <div className="fixed h-screen w-screen z-[1000] top-0 left-0 bg-black/50 flex justify-end">

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#333',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: 350,
        maxWidth: '100%',
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
        Filter Options
      </Typography>

      {/* Location Filter */}
      <Autocomplete
        disablePortal
        value={filter_options?.area}
        onChange={(event, newValue) =>
          set_filter_options((prev_options) => ({
            ...prev_options,
            area: newValue,
          }))
        }
        options={allAreas}
        sx={{
          marginBottom: 2,
          "& .MuiInputBase-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Area"
            variant="outlined"
            className="text-sm lg:text-base"
            sx={{
              input: {
                color: 'white',
              },
              label: {
                color: 'white',
              },
            }}
          />
        )}
      />

      {/* Profession Filter */}
      <Autocomplete
        disablePortal
        value={filter_options?.profession}
        onChange={(event, newValue) =>
          set_filter_options((prev_options) => ({
            ...prev_options,
            profession: newValue,
          }))
        }
        options={professions}
        sx={{
          marginBottom: 2,
          "& .MuiInputBase-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Profession"
            variant="outlined"
            className="text-sm lg:text-base"
            sx={{
              input: {
                color: 'white',
              },
              label: {
                color: 'white',
              },
            }}
          />
        )}
      />

      {/* Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button
          variant="outlined"
          onClick={onApply}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              backgroundColor: '#444',
            },
          }}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              backgroundColor: '#444',
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
    </div>

  );
}
