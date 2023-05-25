import { useSupabaseClient } from '@supabase/auth-helpers-react'
import * as React from 'react';
import { Avatar, Box, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react'
import { useTheme } from '@mui/material/styles';


export default function SignIn() {
  const supabase = useSupabaseClient()
  const theme = useTheme()

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={4} component={Paper} square>

        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ height: "4.5rem", width:"4.5rem" }} src="https://pbs.twimg.com/profile_images/1240932977422598144/VZ-Bp63M_400x400.jpg"/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>

        <Box sx={{ mx: 6 }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#ffc107",
                    brandAccent: '#FDD835',
                  },
                },
              },
             }}
            magicLink
            providers={['google']}
            redirectTo="/signin"
            theme={theme.palette.mode}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: 'url(https://scontent.fnbo10-1.fna.fbcdn.net/v/t39.30808-6/273115645_487723499537424_694447950457268263_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=0debeb&_nc_ohc=xDD1kehpTe4AX98p6jO&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fnbo10-1.fna&oh=00_AfB8H-e1ZJJog-otc4mgaem02JWxUYibxIu_xpp-S2wYdQ&oe=646AB1E5)',
          // backgroundRepeat: 'repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      />

    </Grid>
  );
}