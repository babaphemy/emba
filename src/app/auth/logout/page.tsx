'use client';
import useUser from '@/hooks/useUser';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Logout() {
  const { removeUser } = useUser();

  useEffect(() => {
    removeUser();
  }, [removeUser]);
  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            padding: '70px 0 100px'
          }}
        >
          <Box
            sx={{
              background: '#fff',
              padding: '30px 20px',
              borderRadius: '10px',
              maxWidth: '510px',
              ml: 'auto',
              mr: 'auto',
              textAlign: 'center'
            }}
            className="bg-black"
          >
            <Box>
              <Link href="/" passHref>
                <Image
                  src="/images/logo.png"
                  alt="Black logo"
                  width={250}
                  height={100}
                  className="black-logo"
                  priority
                />
              </Link>

              <Image
                src="/images/logo-white.png"
                alt="White logo"
                width={250}
                height={100}
                className="white-logo"
              />
            </Box>

            <Box mt={4} mb={4}>
              <Image
                width={100}
                height={100}
                src="/images/coffee.png"
                alt="Coffee"
              />
            </Box>

            <Typography variant="h1" fontSize="20px" fontWeight="500" mb={1}>
              You are Logged Out
            </Typography>

            <Typography>Thank you for using Horace LMS</Typography>

            <Button
              href="/login/"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                textTransform: 'capitalize',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '16px',
                padding: '12px 10px',
                color: '#fff !important'
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
