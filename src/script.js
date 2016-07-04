import Test from './auto';

Test(window, document, () => {

	//Start
	UI.start();

	//index.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+(\/index.php||\/)$/,  (url, res) => {
        UI.log('2s跳转到登录页面...');
		UI.work({
			2000 : () => {
                UI.link('http://59.73.145.22:10080/admin/status.php?action=login&url=../view.php?id=1');
			}
		});
	});

	//admin/status.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+\/admin\/status.php/,  (url, res) => {
        UI.log('登录并跳转到题目详情...');
		UI.work({
            2000 : () => {
                UI.log('2s后输入帐号，如果登录成功则直接跳转到详情页...');
            },
			4000 : () => {
                UI('input')[0].value = 'root';
                UI('input')[1].value = 'sksks';
                UI.log('2s后提交登录...');
			},
            6000 : () => {
				UI('input')[2].do('click');
            }
		});
	});

	//view.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+\/view.php\?id=1$/,  (url, res) => {
        UI.log('2s后跳转到提交页...');
		UI.work({
			2000 : () => {
				UI('a')[4].do('click');
			}
		});
	});

	//submit.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+\/submit.php\?id=1$/,  (url, res) => {
        UI.log('2s后输入代码选择语言...');
		UI.work({
			2000 : () => {
				UI('select')[0].value = '2';
				UI('input')[1].do('click');
				UI('textarea')[0].value = `
#include <iostream>
using namespace std;
int main()
{
    int a,b;
    cin >> a >> b;
    cout << a+b << endl;
    return 0;
}
`;
				UI('input')[1].do('click');
                UI.log('2s后提交代码...');
			},
			4000 : () => {
				UI('input')[0].do('click');
			}
		});
	});

	//result.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+\/result.php/,  (url, res) => {
        UI.log('提交结果页，结果自动刷新...');
	});

});
