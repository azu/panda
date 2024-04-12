import { assertType, describe, test } from 'vitest'
import { css } from '../../styled-system-strict-tokens-extends/css'

describe('css', () => {
  test('native CSS prop and value', () => {
    assertType(css({ display: 'flex' }))

    assertType(css({ display: 'abc' }))
    assertType(css({ content: 'abc' }))
    assertType(css({ willChange: 'abc' }))

    assertType(css({ pos: 'absolute' }))
    // @ts-expect-error expected from strictTokens: extends
    assertType(css({ pos: 'absolute123' }))
    // @ts-expect-error expected from strictTokens: extends
    assertType(css({ position: 'absolute123' }))
    // @ts-expect-error expected from strictTokens: extends
    assertType(css({ flex: '0 1' }))
  })

  test('token value', () => {
    assertType(css({ color: 'blue.300' }))
  })

  test('color opacity modifier', () => {
    assertType(css({ color: 'blue.300/40' }))

    // TODO shouldnt be allowed
    assertType(css({ fontSize: '2xl/2' }))
  })

  test('utility prop', () => {
    assertType(
      css({
        srOnly: true,
      }),
    )
  })

  test('shorthand prop', () => {
    assertType(
      css({
        backgroundColor: 'teal',
        bg: 'red',
      }),
    )
  })

  test('object condition prop', () => {
    assertType(css({ bg: { _hover: 'yellow.100' } }))
  })

  test('condition prop', () => {
    assertType(css({ _hover: { bg: 'yellow.200' } }))
  })

  test('nested condition prop', () => {
    assertType(
      css({
        _hover: {
          _dark: {
            bg: 'pink',
          },
        },
      }),
    )
  })

  test('arbitrary value', () => {
    assertType(
      css({
        // @ts-expect-error expected from strictTokens: extends
        color: '#fff',
      }),
    )
  })

  test('arbitrary value escape hatch', () => {
    assertType(
      css({
        color: '[#fff]',
        fontSize: '[123px]',
      }),
    )
  })

  test('arbitrary value escape hatch with conditionals', () => {
    assertType(
      css({
        color: '[#fff]',
        fontSize: '[123px]',
        bgColor: '[#fff!]',
        borderColor: '[#fff !important]',
        _hover: {
          color: '[#fff]',
          fontSize: '[123px]',
          bgColor: '[#fff!]',
          borderColor: '[#fff !important]',
        },
        backgroundColor: {
          _dark: '[#3B00B9]',
          _hover: '[#3B00B9!]',
          _focus: '[#3B00B9 !important]',
        },
      }),
    )
  })

  test('arbitrary selector', () => {
    assertType(css({ ['&:data-panda']: { display: 'flex' } }))
  })

  test('important', () => {
    assertType(
      css({
        fontSize: '2xl!',
        p: '4 !important',
        // @ts-expect-error expected from strictTokens: extends
        bgColor: '#fff!',
        // @ts-expect-error expected from strictTokens: extends
        bg: '#fff!',
        // @ts-expect-error expected from strictTokens: extends
        borderColor: '#fff !important',
        _hover: {
          fontSize: '3xl',
          p: '4 !important',
          // @ts-expect-error expected from strictTokens: extends

          bgColor: '#fff!',
          // @ts-expect-error expected from strictTokens: extends
          borderColor: '#fff !important',
        },
        // @ts-expect-error expected from strictTokens: extends
        backgroundColor: {
          _disabled: '2xl!',
          _active: '4 !important',
          _hover: '#3B00B9!',
          _focus: '#3B00B9 !important',
        },
      }),
    )
  })

  test('responsive condition', () => {
    assertType(
      css({
        sm: {
          bg: 'purple',
        },
      }),
    )
  })

  test('responsive array syntax prop', () => {
    assertType(
      css({
        bg: [
          'cyan.100',
          'cyan.200',
          null,
          // @ts-expect-error expected from strictTokens: extends
          undefined,
          'cyan.300',
        ],
      }),
    )
  })

  test('using inline token helper - in value', () => {
    assertType(
      css({
        // @ts-expect-error expected from strictTokens: extends
        border: '1px solid token(colors.blue.400)',
      }),
    )
  })

  test('using inline token helper - in condition', () => {
    assertType(css({ '@media screen and (min-width: token(sizes.4xl))': { bg: 'blue.500' } }))
  })

  test('nested condition prop with array syntax', () => {
    assertType(css({ _hover: { _dark: { bg: ['pink.100', 'pink.200'] } } }))
  })
})