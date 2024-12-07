import { User } from '@models/User';

export class UserService {
  static async createUser(
    email: string,
    googleId: string,
    accessToken: string,
    refreshToken: string
  ) {
    try {
      return await User.create({
        email,
        googleId,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findUserByGoogleId(googleId: string) {
    try {
      return await User.findOne({
        where: { googleId },
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  static async updateUserTokens(userId: number, accessToken: string, refreshToken: string) {
    try {
      return await User.update({ accessToken, refreshToken }, { where: { id: userId } });
    } catch (error) {
      console.error('Error updating user tokens:', error);
      throw error;
    }
  }
}
