// src/app/api/userauth/route.js
import { UserUseCases } from '@/utils/apiHelpers';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { action, data } = await request.json();
    
    switch (action) {
      case 'register': {
        const { user, otp } = await UserUseCases.register(data);
        return Response.json({ 
          success: true, 
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          },
          otp
        });
      }

      case 'verify-otp': {
        const user = await UserUseCases.verifyOtp(data);
        cookies().set('auth-token', JSON.stringify({ id: user.id }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        return Response.json({ 
          success: true, 
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            profile: user.profile
          }
        });
      }

      case 'login': {
        const user = await UserUseCases.login(data);
        cookies().set('auth-token', JSON.stringify({ id: user.id }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        return Response.json({ 
          success: true, 
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            profile: user.profile
          }
        });
      }

      case 'update-profile': {
        const authToken = cookies().get('auth-token');
        if (!authToken) throw new Error('Unauthorized');
        
        const { id } = JSON.parse(authToken.value);
        const user = await UserUseCases.updateProfile({ 
          userId: id, 
          personalDetails: data.personalDetails,
          jobDetails: data.jobDetails
        });
        return Response.json({ 
          success: true, 
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            profile: user.profile
          }
        });
      }

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  cookies().delete('auth-token');
  return Response.json({ success: true });
}

export async function GET() {
  try {
    const authToken = cookies().get('auth-token');
    if (!authToken) return Response.json({ user: null });

    const { id } = JSON.parse(authToken.value);
    const user = await UserUseCases.getProfile(id);
    return Response.json({ 
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    return Response.json({ user: null });
  }
}