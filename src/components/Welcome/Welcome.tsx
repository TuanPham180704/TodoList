import React, { createContext, useCallback, useContext, useDebugValue, useId, useMemo, useState } from 'react'
import './welcome.css'

// Interface định nghĩa kiểu dữ liệu cho ThemeContext
interface ThemeType {
  theme: {
    color: 'light' | 'dark' // Chỉ chấp nhận 'light' hoặc 'dark'
  }
  onChangeTheme: (color: 'light' | 'dark') => void // Hàm thay đổi theme
}

// Tạo Context với giá trị mặc định
const ThemeContext = createContext<ThemeType>({
  theme: {
    color: 'light'
  },
  onChangeTheme: () => {} // Hàm rỗng mặc định
})

// Hàm mô phỏng tính toán nặng để debug
const doTask = (value: any) => {
  for (let i = 0; i < 99999; i++) {} // Vòng lặp giả lập xử lý nặng
  return value === 'light' ? 'theme is light' : 'theme is dark' // Trả về text dựa trên theme
}

// Custom hook quản lý state theme
const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType['theme']>({ color: 'light' }) // State theme ban đầu

  const onChangeTheme = useCallback((color: 'light' | 'dark') => {
    setTheme((prev) => ({ ...prev, color })) // Cập nhật màu
  }, [])

  useDebugValue(theme.color, doTask) // Hiển thị thông tin theme trong React DevTools

  return {
    theme,
    onChangeTheme
  }
}

export default function Welcome() {
  const { onChangeTheme, theme } = useTheme() // Lấy theme và hàm đổi theme từ hook
  const [, forceRender] = useState({}) // State để ép component render lại

  const valueContext = useMemo(() => {
    return { theme, onChangeTheme } // Gói theme và onChangeTheme vào 1 object
  }, [theme, onChangeTheme]) // Chỉ tạo lại khi theme hoặc onChangeTheme thay đổi

  const pleaseRender = () => forceRender({}) // Ép render lại khi gọi

  return (
    <div className='welcome'>
      <div>
        <button onClick={pleaseRender}>Please Render Welcome</button> {/* Nút ép render */}
      </div>
      <ThemeContext.Provider value={valueContext}> {/* Cung cấp theme cho các component con */}
        <Form />
        <Label />
      </ThemeContext.Provider>
    </div>
  )
}

// Component Label có memo để tránh render lại không cần thiết
const Label = React.memo(() => {
  const { theme, onChangeTheme } = useContext(ThemeContext) // Lấy theme và hàm đổi theme từ Context
  const id = useId() // Tạo id duy nhất cho input/label
  return (
    <div>
      <input
        type='checkbox'
        checked={theme.color === 'dark'} // Nếu dark thì checkbox được chọn
        onChange={(e) => {
          onChangeTheme(e.target.checked ? 'dark' : 'light') // Đổi theme khi click
        }}
        id={id + 'Label'}
      />
      <label htmlFor={id + 'Label'}>Use dark mode</label> {/* Label liên kết checkbox */}
    </div>
  )
})

// Component Form chứa Panel và Button
const Form = () => {
  return (
    <Panel title='Welcome'> {/* Panel bọc các nút */}
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  )
}

// Component Panel nhận title và children
const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext) // Lấy theme từ Context
  const className = 'panel-' + theme.color // Tạo class CSS dựa theo theme
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

// Component Button hiển thị nút với class dựa theo theme
const Button = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext) // Lấy theme từ Context
  const className = 'button-' + theme.color // Class CSS dựa theo theme
  return <button className={className}>{children}</button>
}
