import logo from '@/assets/fakelogo.svg';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  return <img src={logo} alt="Logo" />;
}
