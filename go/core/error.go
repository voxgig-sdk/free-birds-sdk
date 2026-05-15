package core

type FreeBirdsError struct {
	IsFreeBirdsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreeBirdsError(code string, msg string, ctx *Context) *FreeBirdsError {
	return &FreeBirdsError{
		IsFreeBirdsError: true,
		Sdk:              "FreeBirds",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreeBirdsError) Error() string {
	return e.Msg
}
