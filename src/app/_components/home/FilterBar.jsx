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
      <Typography variant="h6" sx={{ color: 'black', marginBottom: 2 }}>
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

        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Area"
            variant="outlined"
            className="text-sm lg:text-base"
      
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
   
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Profession"
            variant="outlined"
            className="text-sm lg:text-base"
       
          />
        )}
      />

      {/* Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button
          variant="outlined"
          onClick={onApply}
    
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
     
        >
          Close
        </Button>
      </Box>
    </Box>
    </div>

  );
}
