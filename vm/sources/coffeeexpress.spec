Name:                   coffeeexpress
Version:                0.1
Release:                1%{?dist}
Summary:                Proyecto Taller de Sistemas de Computacion 2015-2

License:                GPL
URL:                    https://gitlab.labcomp.cl/sftorres/tsc-152-CoffeeExpress.git
Source0:                %{name}.tar.gz
Source1:				%{name}.conf
Source2:				%{name}.sh
Source3:				ssl-%{name}.conf
Source4:				%{name}.15.priv.inf.utfsm.cl.crt
Source5:				%{name}.15.priv.inf.utfsm.cl.key
Source6:				pg_hba-%{name}.conf
Source7:				httpd-ssl-pass-dialog-%{name}
Requires:               nodejs, npm
Requires:               httpd
Requires:               postgresql, postgis
Requires:               setroubleshoot-server
Requires:               setools-console

%description
Nuestra pagina nos permitira encontrar informacion a los
usuarios sobre los conciertos que se realizaran en un determinado lugar,
como llegar a estos destinos (diferentes rutas o alternativas de rutas),
como estara el clima y lugares de hospedaje de interes.

%define source0 %{name}.tar.gz
%define source1 %{name}.conf
%define source2 %{name}.sh
%define source3 ssl-%{name}.conf
%define source4 %{name}.15.priv.inf.utfsm.cl.crt
%define source5 %{name}.15.priv.inf.utfsm.cl.key
%define source6 pg_hba-%{name}.conf
%define source7 httpd-ssl-pass-dialog-%{name}

%prep
# %setup -q -n %{name}
%setup -c %{name}

#%build  

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}/var/www
mkdir -p %{buildroot}/etc/httpd/conf.d
mkdir -p %{buildroot}/etc/pki/tls/certs/
mkdir -p %{buildroot}/etc/pki/tls/private/
mkdir -p %{buildroot}/usr/libexec/
cp -R %{_builddir}/%{name}-%{version}/%{name}/ %{buildroot}/var/www/
cp %{SOURCE1} %{buildroot}/etc/httpd/conf.d/
cp %{SOURCE3} %{buildroot}/etc/httpd/conf.d/
cp %{SOURCE4} %{buildroot}/etc/pki/tls/certs/
cp %{SOURCE5} %{buildroot}/etc/pki/tls/private/
cp %{SOURCE7} %{buildroot}/usr/libexec/

%post
echo "POST"
#openssl rsa -in /etc/pki/tls/private/coffeeexpress.15.priv.inf.utfsm.cl.key -out /etc/pki/tls/certs/coffeeexpress.15.priv.inf.utfsm.cl.crt
cat %{SOURCE6} >> /var/lib/pgsql/data/pg_hba.conf
source %{SOURCE2}
npm install -g pm2
systemctl restart pm2
systemctl enable httpd
#systemctl restart httpd
systemctl enable firewalld
systemctl start firewalld
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --permanent --zone=public --add-service=postgresql
firewall-cmd --permanent --zone=public --add-rich-rule="rule family="ipv4" source address="10.10.15.238/24" port protocol="tcp" port="4000" accept"
firewall-cmd --reload
firewall-cmd --zone=public --list-ports
semanage port -a -t http_port_t -p tcp 4000
pm2 start /%{_var}/www/%{name}/server.js -i 0
systemctl restart httpd
#pm2 startup systemd

%files
%defattr(-,root,root,-)
%attr(0644,root, root) /var/www/%{name}
%attr(0644,root,root) /etc/httpd/conf.d/%{source1}
%attr(0644,root,root) /etc/httpd/conf.d/%{source3}
%attr(0644,root,root) /etc/pki/tls/certs/%{source4}
%attr(0644,root,root) /etc/pki/tls/private/%{source5}
%attr(0644,root,root) /usr/libexec/%{source7}
#%doc

%clean
rm -rf %{buildroot}

%changelog
* Fri Dec 18 2015 CoffeeExpress <cexpress@inf.utfsm.cl> - %{version}
Primer Versión Estable